export function getLastFollowUpInfo(followUps: any[]) {
    if (!followUps || followUps.length === 0) {
        return {
            dateString: null,
            isToday: false,
            isOverdue: false,
            isFuture: false
        };
    }

    // Filter only pending follow-ups
    const pendingFollowUps = followUps.filter(followUp => followUp.status === "pending");
    
    if (pendingFollowUps.length === 0) {
        return {
            dateString: null,
            isToday: false,
            isOverdue: false,
            isFuture: false
        };
    }

    // Get the last pending follow-up (highest date)
    const lastFollowUp = pendingFollowUps.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date) ? current : latest;
    });

    const lastDate = new Date(lastFollowUp.date);
    
    // Format date: "Saturday, June 6, 2026"
    const dateString = lastDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Compare with today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const compareDate = new Date(lastDate);
    compareDate.setHours(0, 0, 0, 0);
    
    const diffDays = compareDate.getTime() - today.getTime();
    
    const isToday = diffDays === 0;
    const isOverdue = diffDays < 0;
    const isFuture = diffDays > 0;

    return {
        dateString,
        isToday,
        isOverdue,
        isFuture
    };
}

export function formatDate(date: Date | string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}