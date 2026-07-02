"""Report generation service.

Responsibilities:
- Aggregate observations by filters (project, date range, floor, trade, severity)
- Render PDF (WeasyPrint / ReportLab) or Excel (openpyxl)
- Upload to StorageProvider
- Trigger delivery (NotificationProvider — email)
- Handle scheduled reports (via job queue)
"""

# TODO: implement.
