export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const data = req.body;
        if (!data.FirstName || !data.LastName || !data.Phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const formBody = new URLSearchParams();
        formBody.append('FirstName', data.FirstName);
        formBody.append('LastName', data.LastName);
        formBody.append('Phone', data.Phone);
        if (data.Street) formBody.append('Street', data.Street);
        if (data.City) formBody.append('City', data.City);
        if (data.Zip) formBody.append('Zip', data.Zip);
        if (data.State) formBody.append('State', data.State);
        if (data.Message) formBody.append('Note', data.Message);
        const r = await fetch(
            'https://leads.acculynx.com/api/leads/submit-new-lead?formID=ce2c1625-e455-4f98-ac12-0bc2391e1394',
            { method: 'POST', body: formBody, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        return res.status(200).json({ success: true, status: r.status, message: 'Lead submitted successfully' });
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
