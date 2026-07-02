"""DrawingElement ORM model — extracted rooms/dims/tags/details from a PDF page."""

# TODO: implement with PostgreSQL persistence.
# Fields: id, pdf_document_id (FK), page_number, element_type (room|dim|tag|detail|schedule),
#         label, value, bbox (JSONB: [x0,y0,x1,y1]), confidence, source (vision|ocr|rule),
#         metadata (JSONB)
