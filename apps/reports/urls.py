from rest_framework import routers
from apps.reports import views

router = routers.DefaultRouter()
router.register('report_questions', views.ReportQuestionViewSet)
router.register('reports', views.ReportViewSet)
router.register('report_items', views.ReportItemViewSet)
