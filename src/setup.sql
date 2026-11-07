-- setup organization table
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- insert data
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- setup service_projects table
CREATE TABLE service_projects (
	project_id SERIAL PRIMARY KEY,
	organization_id INTEGER,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(150) NOT NULL,
	date DATE NOT NULL,
FOREIGN KEY (organization_id) REFERENCES organization (organization_id)
);

-- insert project data
INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES 
  (3, '"Nourish & Neighborhood" Mobile Food Pantry', 'Volunteers partner with local food banks to set up a pop-up distribution site in underserved neighborhoods.', 'Lacamas Community Center', '2026-06-13'),
  (3, '"Green Unity" Urban Garden & Park Revitalization', 'A hands-on day of environmental stewardship at a local public park, community garden, or school green space.', 'Nisqually Pines Offices', '2026-04-18'),
  (3, '"Tech Bridge" Senior Digital Literacy Workshop', 'Volunteers host interactive, small-group or 1-on-1 coaching sessions at a local senior center to help older adults navigate modern technology safely.', 'East Portland Community Center', '2026-07-15'),
  (3, '"Unity Packs" Back-to-School Supply Drive & Assembly', 'A dual-phase initiative involving community donation collection followed by a high-energy packing event.', 'East Portland Community Center', '2026-07-15'),
  (3, '"Warm Hearts, Warm Homes" Shelter Repair & Comfort Drive', 'Volunteers assist a local emergency shelter, domestic violence refuge, or youth housing facility with maintenance and comfort kits.', 'The Tacoma Rescue Mission', '2026-11-07');
--
  (2, 'Urban Micro-Farm & Community Garden Buildout', 'Transform an unused vacant lot, community center lawn, or schoolyard into a functioning, high-yield urban micro-farm or community vegetable garden.', 'Underutilized municipal vacant lots', '2027-04-16'),
  (2, '"Harvest to Pantry" Fresh Produce Donation Drive', 'Organize structured harvests from local partner farms, community gardens, or backyard gardens to directly supply local food banks, shelters, and community pantries.', 'regional farm partners', '2027-05-05'),
  (2, 'School Soil & Seed STEM Workshops', 'Host interactive educational workshops at local public schools or youth centers to teach children the science of soil health, seed starting, and sustainable food systems.', 'community youth centers', '2027-03-24'),
  (2, 'Pollinator Corridor & Native Flora Restoration', 'Establish native pollinator habitats and wildflower corridors along public parks, farm perimeters, or suburban trailways to support wild bees, butterflies, and local ecosystems.', 'public park borders', '2027-10-10'),
  (2, 'Community Composting & Waste Diversion Hub', 'Launch a neighborhood food scrap collection and community composting initiative to divert organic waste from landfills and turn it into rich soil amendment.', 'centralized community garden center', '2027-04-22');
--
  (1, '"Build-a-Desk" Youth Study Nook Drive', 'Volunteers design and construct simple, ergonomic wooden study desks and bookshelves for low-income students who lack a quiet, dedicated learning space at home.', 'Eatonville Community Center', '2027-02-08'),
  (1, 'Community Sustainable Urban Garden & Greenhouse', 'BrightFuture Builders constructs vertical garden beds, raised planters, and a small community greenhouse in a local urban food desert.', 'Tillicum American Lake Gardens Community Center', '2027-04-11'),
  (1, 'Shelter & Transitional Housing Refresh', 'A targeted, high-impact overhaul of local family shelters, youth transition homes, or community centers needing structural repair and cosmetic updates.', 'Tacoma Community House', '2027-06-20'),
  (1, 'STEM & Trades Mobile Workshop ("Future Toolkits")', 'A hybrid project combining physical creation and interactive skills training. BrightFuture Builders creates custom mobile workbench carts and hosts hands-on carpentry/STEM workshops for teenagers.', 'Discovery Park Community Center', '2027-08-28'),
  (1, 'Senior Safe-At-Home Accessibility Upgrades', 'Volunteer crews mobilize to perform essential safety and accessibility modifications for low-income elderly or disabled homeowners.', 'A Place for Me', '2027-10-17');

--select projects along with their organizations
SELECT o.name, c.title
FROM 
    organization o 
INNER JOIN
    service_projects c ON o.organization_id = c.organization_id;