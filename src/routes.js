import express from 'express';

import { showHomePage } from './controller/index.js';
import { showOrganizationsPage } from './controller/organizations.js';
import { showProjectsPage } from './controller/projects.js';
import { showCategoriesPage } from './controller/categories.js';
import { testErrorPage } from './controller/error.js';
import { showOrganizationDetailsPage } from './controller/organizations.js';
import { showProjectDetailsPage } from './controller/projects.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);


// error-handling routes
router.get('/test-error', testErrorPage);

router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);

export default router;