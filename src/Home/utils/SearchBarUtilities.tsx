const generateAllowedDates = (events) => {
    const dates = new Set();

    events.forEach((event) => {
        const start = new Date(event.startDate);

        // 1 day before
        const d1 = new Date(start);
        d1.setDate(start.getDate() - 1);

        // 2 days before
        const d2 = new Date(start);
        d2.setDate(start.getDate() - 2);

        dates.add(d1.toISOString().split("T")[0]);
        dates.add(d2.toISOString().split("T")[0]);
    });

    return Array.from(dates).sort();
};

export { generateAllowedDates }
