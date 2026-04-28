import { ChangeEvent, FormEvent, useState } from 'react';
import { useModel } from 'umi';
import { PricingType } from '@/services/freelancer/profile/typing';
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
		isEditing,
	} = useModel('freelancer.profile.index');

	const [skillInput, setSkillInput] = useState('');
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
					{isEditing ? (
						<input
							id='experience'
							type='text'
							value={experience}
							onChange={(event) => setExperience(event.target.value)}
							placeholder='e.g. 8+ Years'
						/>
					) : (
						<p className='static-text'>{experience}</p>
					)}
				</div>
				<div className='service-field'>
					<label htmlFor='category'>Primary Service</label>
					{isEditing ? (
						<input
							id='category'
							type='text'
							value={category}
							onChange={(event) => setCategory(event.target.value)}
							placeholder='e.g. UI/UX & Product Design'
						/>
					) : (
						<p className='static-text'>{category}</p>
					)}
				</div>
			</div>

			<div className='skills-row'>
				<span className='service-label'>Skills</span>
				<div className='skill-chips'>
					{skills.map((skill) => (
						<div key={skill} className='skill-chip'>
							{skill}
							{isEditing && (
								<span
									className='remove'
									aria-label='remove skill'
									onClick={() => removeSkill(skill)}
								>
									×
								</span>
							)}
						</div>
					))}
				</div>
				{isEditing && (
					<>
						<form className='inline-form' onSubmit={handleSkillSubmit}>
							<input
								type='text'
								placeholder='Add a skill and press enter'
								value={skillInput}
								onChange={(event) => setSkillInput(event.target.value)}
							/>
							<button type='submit'>Add Skill</button>
						</form>
						<small>Tip: Click the × to remove it from your profile.</small>
					</>
				)}
			</div>

			<div className='service-grid language-grid'>
				<div className='service-field'>
					<label>Languages</label>
					<ul className='language-list'>
						{languages.map((lang) => (
							<li key={lang.id}>
								<span>{lang.name}</span>
								{isEditing && (
									<button
										type='button'
										onClick={() => removeLanguage(lang.id)}
										aria-label='Remove language'
									>
										×
									</button>
								)}
							</li>
						))}
					</ul>
					{isEditing && (
						<form className='inline-form' onSubmit={handleLanguageSubmit}>
							<input
								type='text'
								placeholder='Add a language'
								value={languageInput}
								onChange={(event) => setLanguageInput(event.target.value)}
							/>
							<button type='submit'>Add Language</button>
						</form>
					)}
				</div>
				<div className='service-field'>
					<label>Pricing Preference</label>
					<div className={`pricing-toggle ${!isEditing ? 'disabled' : ''}`}>
						<button
							type='button'
							className={pricing === PricingType.Hourly ? 'active' : ''}
							onClick={() => isEditing && setPricing(PricingType.Hourly)}
						>
							Hourly
						</button>
						<button
							type='button'
							className={pricing === PricingType.Fixed ? 'active' : ''}
							onClick={() => isEditing && setPricing(PricingType.Fixed)}
						>
							Fixed
						</button>
					</div>
					<div className='rate-input'>
						{isEditing ? (
							<input
								type='text'
								value={rate}
								onChange={(event: ChangeEvent<HTMLInputElement>) => setRate(event.target.value)}
								placeholder={pricing === 'Hourly' ? '85' : '2500'}
							/>
						) : (
							<p className='static-text'>{rate}</p>
						)}
						<span>{pricing === PricingType.Hourly ? '/ hr' : '/ project'}</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Serviceskill;
