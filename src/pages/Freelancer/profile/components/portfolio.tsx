import { FormEvent, useState } from 'react';
import { useModel } from 'umi';
import './portfolio.less';

const Portfolio = () => {
	const { projects, addProject, removeProject, isEditing } = useModel('freelancer.profile.index');
	const [showForm, setShowForm] = useState(false);
	const [formValues, setFormValues] = useState({ title: '', type: '', link: '' });

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addProject({
			title: formValues.title.trim(),
			type: formValues.type.trim(),
			link: formValues.link.trim(),
		});
		setFormValues({ title: '', type: '', link: '' });
		setShowForm(false);
	};

	return (
		<section className='portfolio-card'>
			<div className='portfolio-header'>
				<h3>Portfolio</h3>
				{isEditing && (
					<button type='button' className='add-link' onClick={() => setShowForm((prev) => !prev)}>
						{showForm ? 'Close' : '+ Add Project'}
					</button>
				)}
			</div>

			{isEditing && showForm && (
				<div className='project-form'>
					<form onSubmit={handleSubmit}>
						<div className='form-grid'>
							<label>
								<span>Project Title</span>
								<input
									type='text'
									placeholder='e.g. Nova Banking App'
									required
									value={formValues.title}
									onChange={(event) => setFormValues((prev) => ({ ...prev, title: event.target.value }))}
								/>
							</label>
							<label>
								<span>Work Type</span>
								<input
									type='text'
									placeholder='Product Strategy, UI/UX'
									required
									value={formValues.type}
									onChange={(event) => setFormValues((prev) => ({ ...prev, type: event.target.value }))}
								/>
							</label>
						</div>
						<label>
							<span>Case Study / URL (optional)</span>
							<input
								type='url'
								placeholder='https://'
								value={formValues.link}
								onChange={(event) => setFormValues((prev) => ({ ...prev, link: event.target.value }))}
							/>
						</label>
						<div className='form-actions'>
							<button type='button' className='ghost' onClick={() => setShowForm(false)}>
								Cancel
							</button>
							<button type='submit' className='primary'>
								Save Project
							</button>
						</div>
					</form>
				</div>
			)}

			{projects.length ? (
				<div className='project-grid'>
					{projects.map((project) => (
						<article key={project.id} className='project-card'>
							{isEditing && (
								<button
									className='remove-project-btn'
									onClick={() => removeProject(project.id)}
									aria-label='Remove project'
								>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
										<polyline points='3 6 5 6 21 6'></polyline>
										<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
									</svg>
								</button>
							)}
							<div className={`project-thumb ${project.id}`} />
							<div className='project-info'>
								<h4>{project.title}</h4>
								<p>{project.type}</p>
								{project.link && (
									<a href={project.link} target='_blank' rel='noreferrer'>
										View case study
									</a>
								)}
							</div>
						</article>
					))}
				</div>
			) : (
				<div className='portfolio-empty'>No projects yet. Add your best work.</div>
			)}
		</section>
	);
};

export default Portfolio;
