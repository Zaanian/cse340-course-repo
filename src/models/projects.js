import db from './db.js'

const getAllProjects = async () => {
    const query = ` 
        SELECT o.name, c.title, c.date
    FROM 
        public.organization o 
    INNER JOIN
        public.service_projects c ON o.organization_id = c.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllProjects }  