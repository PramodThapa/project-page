let initialProjects = [
  {
    id: 0,
    name: 'ASP Latest Test',
    description:
      'The latest test that is being done on asp. It is done properly and will take time.',
    pipeline: [
      { id: 0, name: 'ASP Pipeline', stage: 'Lead Identification' },
      { id: 1, name: 'Antibody Pipeline', stage: 'Lead Validation' },
      { id: 2, name: 'ASP Pipeline', stage: 'Lead Identification' },
    ],
    type: 'Internal Project',
    status: 'In Progress',
    priority: 'High',
    statusDescription: 'Project is in progress phase.',
  },
  {
    id: 1,
    name: 'ASP Test 9.0',
    description:
      'The version 9.0 will add this and that feature that you can read in this document. The version 9.0 will add this and that feature that you can read in this document.',
    pipeline: [
      { id: 0, name: 'ASP Pipeline', stage: 'Lead Identification' },
      { id: 1, name: 'Antibody Pipeline', stage: 'Lead Validation' },
    ],
    type: 'Internal Project',
    status: 'Completed',
    statusDescription: 'completed',
    priority: 'High',
    statusDescription: 'Project is completed.',
  },
  {
    id: 2,
    name: 'Test Project',
    description:
      'The version  will add this and that feature that you can read in this document. The version 9.0 will add this and that feature that you can read in this document.',
    pipeline: [{ id: 0, name: 'ASP Pipeline', stage: 'Lead Identification' }],
    type: 'External Project',
    status: 'Completed',
    priority: 'Low',
    statusDescription: 'Project is Completed',
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
