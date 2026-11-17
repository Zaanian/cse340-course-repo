import db from './db.js'

const getAllCategories = async () => {
    const query = ` 
        SELECT category_name , category_id
        FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}
//
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, category_name 
        FROM categories 
        WHERE category_id = $1;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows[0];
}
//
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name 
        FROM categories c
        JOIN project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
}
//
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date 
        FROM service_projects sp
        JOIN project_categories pc ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
}
export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId }  