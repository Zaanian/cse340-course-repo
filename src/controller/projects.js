import { getProjectDetails } from '../models/projects.js';
import { getUpcomingServiceProjects } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';


const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingServiceProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Service Project';

    res.render('project', { title, projectDetails, categories });
}

export { showProjectsPage, showProjectDetailsPage }