import { ChangeEvent, FormEvent, useState } from 'react';
import { useModel } from 'umi';
import './serviceskill.less';

const Serviceskill = () => {
	const {
		experience,
		setExperience,
		category,
		setCategory,
		skills,
		addSkill,
		removeSkill,
		languages,
		addLanguage,
		removeLanguage,
		pricing,
		setPricing,
		rate,
		setRate,
	} = useModel('freelancer.profile.index');

	const [skillInput, setSkillInput]     = useState('');
	const [languageInput, setLanguageInput] = useState('');

	const handleSkillSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addSkill(skillInput);
		setSkillInput('');
	};

	const handleLanguageSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addLanguage(languageInput);
		setLanguageInput('');
	};

	return (
		<section className='service-card'>
			<h3>Service &amp; Skills</h3>
			<div className='service-grid'>
				<div className='service-field'>
					<label htmlFor='experience'>Years of Experience</label>
					<input
						id='experience'
						type='text'
						value={experience}
						onChange={(event) => setExperience(event.target.value)}
						placeholder='e.g. 8+ Years'
					/>
				</div>
				<div className='service-field'>
					<label htmlFor='category'>Primary Service</label>
					<input
						id='category'
						type='text'
						value={category}
						onChange={(event) => setCategory(event.target.value)}
						placeholder='e.g. UI/UX & Product Design'
					/>
				</div>
			</div>

			<div className='skills-row'>
				<span className='service-label'>Skills</span>
				<div className='skill-chips'>
					{skills.map((skill) => (
						<button key={skill} className='skill-chip' type='button' onClick={() => removeSkill(skill)}>
							{skill}
							<span className='remove' aria-label='remove skill'>×</span>
						</button>
					))}
				</div>
				<form className='inline-form' onSubmit={handleSkillSubmit}>
					<input
						type='text'
						placeholder='Add a skill and press enter'
						value={skillInput}
						onChange={(event) => setSkillInput(event.target.value)}
					/>
					<button type='submit'>Add Skill</button>
				</form>
				<small>Tip: Click a skill to remove it from your profile.</small>
			</div>

			<div className='service-grid language-grid'>
				<div className='service-field'>
					<label>Languages</label>
					<ul className='language-list'>
						{languages.map((lang) => (
							<li key={lang.id}>
								<span>{lang.name}</span>
								<button type='button' onClick={() => removeLanguage(lang.id)} aria-label='Remove language'>
									×
								</button>
							</li>
						))}
					</ul>
					<form className='inline-form' onSubmit={handleLanguageSubmit}>
						<input
							type='text'
							placeholder='Add a language'
							value={languageInput}
							onChange={(event) => setLanguageInput(event.target.value)}
						/>
						<button type='submit'>Add Language</button>
					</form>
				</div>
				<div className='service-field'>
					<label>Pricing Preference</label>
					<div className='pricing-toggle'>
						<button
							type='button'
							className={pricing === 'Hourly' ? 'active' : ''}
							onClick={() => setPricing('Hourly')}
						>
							Hourly
						</button>
						<button
							type='button'
							className={pricing === 'Fixed' ? 'active' : ''}
							onClick={() => setPricing('Fixed')}
						>
							Fixed
						</button>
					</div>
					<div className='rate-input'>
						<input
							type='text'
							value={rate}
							onChange={(event: ChangeEvent<HTMLInputElement>) => setRate(event.target.value)}
							placeholder={pricing === 'Hourly' ? '85' : '2500'}
						/>
						<span>{pricing === 'Hourly' ? '/ hr' : '/ project'}</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Serviceskill;
