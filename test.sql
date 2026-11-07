SELECT o.name, c.title
FROM 
    organization o 
INNER JOIN
    service_projects c ON o.organization_id = c.organization_id;