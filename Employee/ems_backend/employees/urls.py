from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import DynamicFormFieldViewSet, EmployeeViewSet, submit_form, update_form_order
from .views import RegisterView, LoginView
from .views import ChangePasswordView  
# from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterUserView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r'form-fields', DynamicFormFieldViewSet)
router.register(r'employees', EmployeeViewSet)

urlpatterns = router.urls + [
    path('submit-form/', submit_form, name='submit-form'),
    path('form-fields/order/', update_form_order, name='update-form-order'),  
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterUserView.as_view(), name='register_user'),      
]