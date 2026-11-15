import express from 'express';

import { showHomePage } from './controller/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controller/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controller/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controller/categories.js';
import { testErrorPage } from './controller/error.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);


router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;