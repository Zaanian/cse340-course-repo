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

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

/**
 * Queries the database for upcoming service projects.
 */
async function getUpcomingServiceProjects(numberOfProjects) {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM 
            service_projects p
        JOIN 
            organization o ON p.organization_id = o.organization_id
        WHERE 
            p.date >= CURRENT_DATE
        ORDER BY 
            p.date ASC
        LIMIT $1;
    `;

    try {
        const result = await db.query(query, [numberOfProjects]);

        // Map the rows to match the required property names
        const projects = result.rows.map(row => ({
            project_id: row.project_id,
            title: row.title,
            description: row.description,
            date: row.date,
            location: row.location,
            organization_id: row.organization_id,
            organization_name: row.organization_name
        }));

        return projects;
    } catch (error) {
        console.error("Error fetching service projects:", error);
        throw error;
    }
}

async function getProjectDetails(id) {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM 
            service_projects p
        INNER JOIN 
            organization o ON p.organization_id = o.organization_id
        WHERE 
            p.project_id = $1;
    `;

    try {
        const result = await db.query(query, [id]);
        return result.rows[0] || null; // Returns the service project object or null if not found
    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingServiceProjects, getProjectDetails };