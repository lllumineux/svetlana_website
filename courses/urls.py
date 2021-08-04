from rest_framework import routers
from courses import views

router = routers.DefaultRouter()
router.register('courses', views.CourseViewSet)
router.register('weeks', views.WeekViewSet)
router.register('days', views.DayViewSet)
