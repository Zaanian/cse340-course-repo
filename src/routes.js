import express from 'express';

import { showHomePage } from './controller/index.js';
import {
    showOrganizationsPage, showOrganizationDetailsPage,
    showNewOrganizationForm, processNewOrganizationForm,
    organizationValidation, showEditOrganizationForm, processEditOrganizationForm
} from './controller/organizations.js';
import {
    showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm,
    projectValidation, showEditProjectForm, processEditProjectForm
} from './controller/projects.js';
import {
    showCategoriesPage, showCategoryDetailsPage,
    showAssignCategoriesForm, processAssignCategoriesForm,
    showEditcategoryForm, processEditcategoryForm,
    showNewCategoryform, processNewCategoryform,
    categoryValidation
} from './controller/categories.js';
import { testErrorPage } from './controller/error.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);


router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route to display edit project form
router.get('/edit-project/:id', showEditProjectForm)
// Route to handle edit project form submission
router.post('/edit-project/:id', processEditProjectForm)

// Route to display the edit category form
router.get('/edit-category/:id', showEditcategoryForm);
// Route to handle the edit category form submission
router.post('/edit-category/:id', processEditcategoryForm);

//Route to new category page
router.get('/new-category', showNewCategoryform)
//Route to handle new category page
router.post('/new-category', categoryValidation, processNewCategoryform)

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;