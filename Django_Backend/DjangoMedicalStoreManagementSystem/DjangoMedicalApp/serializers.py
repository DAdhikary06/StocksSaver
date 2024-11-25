from rest_framework import serializers

from DjangoMedicalApp.models import Company, CompanyBank, Medicine, MedicalDetails, Employee, Customer, Bill, \
    CustomerRequest, CompanyAccount, EmployeeBank, EmployeeSalary, BillDetails


class CompanySerliazer(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields="__all__"


class CompanyBankSerializer(serializers.ModelSerializer):
    class Meta:
        model=CompanyBank
        fields="__all__"

    # def to_representation(self, instance):
    #     response=super().to_representation(instance)
    #     response['company']=CompanySerliazer(instance.company_id).data
    #     return response


class MedicineSerliazer(serializers.ModelSerializer):
    class Meta:
        model=Medicine
        fields="__all__"

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['company']=CompanySerliazer(instance.company_id).data
        return response



class MedicalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=MedicalDetails
        fields="__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['medicine'] = MedicineSerliazer(instance.medicine_id).data
        return response

class MedicalDetailsSerializerSimple(serializers.ModelSerializer):
    class Meta:
        model=MedicalDetails
        fields="__all__"

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields="__all__"


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields="__all__"

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bill
        fields="__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['customer'] = CustomerSerializer(instance.customer_id).data
        return response

class CustomerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomerRequest
        fields="__all__"


class CompanyAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=CompanyAccount
        fields="__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['company'] = CompanySerliazer(instance.company_id).data
        return response


class EmployeeBankSerializer(serializers.ModelSerializer):
    class Meta:
        model=EmployeeBank
        fields="__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['employee'] = EmployeeSerializer(instance.employee_id).data
        return response


class EmployeeSalarySerializer(serializers.ModelSerializer):
    class Meta:
        model=EmployeeSalary
        fields="__all__"

class BillDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=BillDetails
        fields="__all__"
        
        
# ***********************************
# For User Registration
# ***********************************
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_bytes
from django.urls import reverse
from .utils import send_normal_email,send_reset_password_email # Assuming you have a utility function to send emails

class SuperuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
        
    def validate(self, data):
        if not data.get('first_name'):
            raise serializers.ValidationError({"first_name": "This field is required."})
        if not data.get('last_name'):
            raise serializers.ValidationError({"last_name": "This field is required."})
        return data
    
    def create(self, validated_data):
        user = User.objects.create_superuser(**validated_data)
        # print(f"User created: {user.username}, is_superuser: {user.is_superuser}, is_staff: {user.is_staff}")
        mail_subject = 'Successful Registration'
        # email_body = f"Hi {user.first_name} {user.last_name},\nYou have successfully registered as a superuser.\nYour username is {user.username}."
        # data = {
        #     'email_body': email_body,
        #     'to_email': user.email,
        #     'email_subject': mail_subject
        # }
        context = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            # 'password': password,
        }
        data = {
            'email_subject': mail_subject,
            'to_email': user.email,
            'context': context
        }
        send_normal_email(data)
        return user

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    
    class Meta:
        fields = ['email']
        
    def validate(self, attrs):
        email = attrs.get('email', '')
        user = User.objects.filter(email=email).first()
        if user:
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get('request')
            site_domain = 'localhost:5173'
            relative_link = reverse('password_reset_confirm', kwargs={'uidb64': uidb64, 'token': token})
            # print(relative_link)
            abslink = f"http://{site_domain}{relative_link}"
            # print(abslink)
            # email_body = f"Hi {user.username}, click on the link below to reset your password.\n{abslink}"
            context = {
            # 'first_name': user.first_name,
            # 'last_name': user.last_name,
            'username': user.username,
            # 'password': password,
            'reset_link': abslink
            }
            data = {
                # 'email_body': email_body,
                'email_subject': 'Reset your password',
                'to_email': user.email,
                'context': context
            }
            send_reset_password_email(data)
        
        # Always return success message regardless of whether the email exists
        return super().validate(attrs)

class PasswordResetConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    
# ************************************************************************************
# For getting the token which gives access and refresh token and username in response
# ************************************************************************************
# serializers.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add username to the response data
        data['username'] = self.user.username

        return data
    