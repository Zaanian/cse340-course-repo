import {
    getAllCategories, getCategoryById,
    getProjectsByCategoryId, getCategoriesByProjectId,
    updateCategoryAssignments, createCategory, updateCategory
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';


const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'category details'

    res.render('category', {
        title, category, projects
    });
}
const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryform = async (req, res) => {

}

const processNewCategoryform = async (req, res) => {

}

const showEditcategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    const title = 'Edit Category';
    res.render('edit-category', { title, category });
}


const processEditcategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const { title } = req.body;

    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit project form
        return res.redirect('/edit-organization/' + req.params.id);
    }

    await updateCategory(categoryId, title);

    // Set a success flash message
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
}
export {
    showCategoriesPage, showCategoryDetailsPage,
    showAssignCategoriesForm, processAssignCategoriesForm,
    showEditcategoryForm, processNewCategoryform,
    showNewCategoryform, processEditcategoryForm
}