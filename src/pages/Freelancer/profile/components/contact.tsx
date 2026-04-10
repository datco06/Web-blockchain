import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import './contact.less';

const defaultBio =
	'I’m a digital product designer with over 8 years of experience building scalable design systems and intuitive user interfaces for tech startups and established brands globally.';

const Contact = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [avatarPreview, setAvatarPreview] = useState('/images/avatar-placeholder.png');
	const [formValues, setFormValues] = useState({
		displayName: 'Alex Rivera',
		title: 'Senior Product Designer & Brand Strategist',
		bio: defaultBio,
	});

	const triggerFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setAvatarPreview(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleChange =
		(field: 'displayName' | 'title' | 'bio') =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { value } = event.target;
			setFormValues((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: connect to API
	};

	return (
		<form className='contact' onSubmit={handleSubmit}>
			<div className='avatar-update'>
				<img src={avatarPreview} alt='Profile avatar preview' />
				<button type='button' className='avatar-btn' onClick={triggerFilePicker}>
					<span role='img' aria-label='camera'>
						📷
					</span>
				</button>
				<input
					type='file'
					accept='image/*'
					ref={fileInputRef}
					onChange={handleAvatarChange}
					hidden
				/>
			</div>
			<div className='fields'>
				<label>
					<span>Display Name</span>
					<input type='text' value={formValues.displayName} onChange={handleChange('displayName')} />
				</label>
				<label>
					<span>Professional Title</span>
					<input type='text' value={formValues.title} onChange={handleChange('title')} />
				</label>
				<label className='textarea'>
					<span>Short Bio</span>
					<textarea rows={4} value={formValues.bio} onChange={handleChange('bio')} />
				</label>
				
			</div>
		</form>
	);
};

export default Contact;
