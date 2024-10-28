"""
URL configuration for DjangoMedicalStoreManagementSystem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from rest_framework import routers
from DjangoMedicalApp import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from DjangoMedicalApp.views import SuperuserCreateView, PasswordResetRequestView, PasswordResetConfirmView
from DjangoMedicalApp.views import CustomTokenObtainPairView

routers = routers.DefaultRouter()
routers.register('company', views.CompanyViewSet,basename='company') # Help us to get company details
routers.register('companybank', views.CompanyBankViewset,basename='companybank') # Help us to get company bank details
routers.register('medicine', views.MedicineViewSet,basename='medicine') # Help us to get medicine details
routers.register("companyaccount",views.CompanyAccountViewset,basename="companyaccount") # Help us to get company account details
routers.register("employee",views.EmployeeViewset,basename="employee") # Help us to get company account details
routers.register("employee_all_bank",views.EmployeeBankViewset,basename="employee_all_bank") # Help us to get all employee bank details
routers.register("employee_all_salary",views.EmployeeSalaryViewset,basename="employee_all_salary") # Help us to get all employee salary details
routers.register("generate_bill_api",views.GenerateBillViewSet,basename="generate_bill_api") # Help us to generate bill
routers.register("customer_request",views.CustomerRequestViewset,basename="customer_request") # Help us to get customer request
routers.register("home_api",views.HomeApiViewset,basename="home_api") # Help us to get home api data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(routers.urls)), 
    # path('api/gettoken/',TokenObtainPairView.as_view(),name='gettoken'), # login api
    path('api/gettoken/', CustomTokenObtainPairView.as_view(), name='gettoken'), # login api
    path('api/refresh_token/',TokenRefreshView.as_view(),name='refresh_token'), # refresh token api
    # ****************** User registration api ************************* #
    path('api/create-superuser/', SuperuserCreateView.as_view(), name='create_superuser'), # Create superuser endpoint
    path('api/password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'), # Password reset request endpoint
    path('api/password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'), # Password reset confirm endpoint
    # ******************************************************************** #
    path('api/companybyname/<str:name>/',views.CompanyNameViewSet.as_view(),name="companybyname"), # company by name
    path('api/medicinebyname/<str:name>',views.MedicineByNameViewSet.as_view(),name="medicinebyname"),
    path('api/companyonly/',views.CompanyOnlyViewSet.as_view(),name="companyonly"), # All company data only
    path('api/employee_bankby_id/<str:employee_id>',views.EmployeeBankByEIDViewSet.as_view(),name="employee_bankby_id"), # single employee bank details
    path('api/employee_salaryby_id/<str:employee_id>',views.EmployeeSalaryByEIDViewSet.as_view(),name="employee_salaryby_id"), # single employee salary details
]
