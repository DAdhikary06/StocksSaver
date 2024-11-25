# For Sending Email to user after registration
# from django.core.mail import EmailMessage

# def send_normal_email(data):
    # email = EmailMessage(
        # subject=data['email_subject'],
        # body=data['email_body'],
        # to=[data['to_email']]
    # )
    # email.send()
    
from django.core.mail import send_mail
from django.conf import settings

def send_normal_email(data):
    send_mail(
        subject=data['email_subject'],
        message=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,  # Replace with your actual from email
        recipient_list=[data['to_email']],
        fail_silently=False,
    )
    
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

# send email function for sending registration email
def send_normal_email(data):
    subject = data['email_subject']
    to_email = data['to_email']
    context = data['context']

    # text_content = render_to_string('emails/registration_email.txt', context)
    html_content = render_to_string('emails/registration_email.html', context)

    email = EmailMultiAlternatives(subject,'', settings.EMAIL_HOST_USER, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()

# send email function for sending password reset email
def send_reset_password_email(data):
    subject = data['email_subject']
    to_email = data['to_email']
    context = data['context']

    # text_content = render_to_string('emails/registration_email.txt', context)
    html_content = render_to_string('emails/password_reset_email.html', context)

    email = EmailMultiAlternatives(subject,'', settings.EMAIL_HOST_USER, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()
   
# send email function for sending password reset confirmation email 
def send_password_reset_confirmation_email(data):
    subject = data['email_subject']
    to_email = data['to_email']
    context = data['context']

    # text_content = render_to_string('emails/registration_email.txt', context)
    html_content = render_to_string('emails/password_reset_confirmation_email.html', context)

    email = EmailMultiAlternatives(subject,'', settings.EMAIL_HOST_USER, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()

    


