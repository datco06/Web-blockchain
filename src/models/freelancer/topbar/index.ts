import { useState, useRef, useEffect } from 'react';
import useAuthModel from '@/models/Sgin-In';

export default function useFreelancerTopbarModel() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { logout, initials } = useAuthModel();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return {
		isDropdownOpen,
		setIsDropdownOpen,
		dropdownRef,
		handleLogout: logout,
		initials,
	};
}
