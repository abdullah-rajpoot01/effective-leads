const lead = {
    "id": "uuid",
    "name": "Burhan Rajpoot", // required

    "email": "info@abcagency.com", // optional

    "mobiles": [
        "+923001234567"  // one item required
    ],

    "whatsapp": "+923001234567", //string (optional)

    "address": "123 Main Road", // string optional

    "company": "ABC Marketing Agency", // string optional

    "city": "Lahore", // exactly  Lahore

    "status": "new",// string   "new", "contacted",  "qualified",  "detail_shared",  "interested",  "no_answer",  "busy","call_back_later", "not_interested",   "follow_up",  "converted",  "rejected",  "lost", required

    "source": "Facebook", //string required

    "priority": "medium", // "low", "medium", "high" required

    "conversationChannel": "whatsapp", // string

    "notes": [
        {
            "text": "Client interested in SEO services", //string required
            "createdAt": "2026-06-18T10:00:00.000Z" // hidden automatically created
        }
    ],

    "followUps": [
        {
            "date": "2026-06-20T14:00:00.000Z", //required
            "type": "call", // string required
            "channel": "phone", //string required
            "note": "Call to discuss package details", // string required
            "status": "pending", // "pending", "completed", "missed" required
            "createdAt": "2026-06-18T10:05:00.000Z", // hidden automatically created
            "completedAt": undefined // undefined | date
        }
    ],

};