"""Observation lifecycle service.

Responsibilities:
- Create observation from field capture (photo/voice/text)
- Dispatch attachments to StorageProvider
- Trigger STT for voice notes (SpeechProvider)
- Trigger vision auto-description for photos (VisionProvider via LlmProvider multimodal)
- Auto-tag classification (issue_type, severity, trade) via LLM
- Persist Pin if floor_plan_pdf_id provided
- Emit event for dashboard update
- Cross-reference standard details (bidirectional loop per brief §2.5)
"""

# TODO: implement.
