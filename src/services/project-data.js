let initialProjects = [
  {
    id: 0,
    name: 'ASP Latest Test',
    description:
      'The latest test that is being done on asp. It is done properly and will take time.',
    pipeline: [
      { name: 'ASP Pipeline', stage: 'Lead Identification' },
      { name: 'Antibody Pipeline', stage: 'Lead Validation' },
      { name: 'ASP Pipeline', stage: 'Lead Identification' },
    ],
    type: 'internal',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 1,
    name: 'ASP Test 9.0',
    description:
      'The version 9.0 will add this and that feature that you can read in this document. The version 9.0 will add this and that feature that you can read in this document.',
    pipeline: [
      { name: 'ASP Pipeline', stage: 'Lead Identification' },
      { name: 'Antibody Pipeline', stage: 'Lead Validation' },
    ],
    type: 'internal',
    status: 'Completed',
    statusDescription: 'completed',
    priority: 'High',
  },
  {
    id: 2,
    name: 'Test Project',
    description:
      'The version  will add this and that feature that you can read in this document. The version 9.0 will add this and that feature that you can read in this document.',
    pipeline: [{ name: 'ASP Pipeline', stage: 'Lead Identification' }],
    type: 'external',
    status: 'Completed',
    priority: 'Low',
  },
];

function addInitialProject(project) {
  if (localStorage.getItem('project') === null) {
    localStorage.setItem('project', JSON.stringify(project));
  }
}

function addProject(project) {
  localStorage.setItem('project', JSON.stringify(project));
}

function getProject() {
  let project;
  if (localStorage.getItem('project') != null) {
    project = JSON.parse(localStorage.getItem('project'));
  }
  return project;
}

export { addInitialProject, initialProjects, getProject };
