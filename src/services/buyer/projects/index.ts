
import type { Project } from './typing';
import { ProjectStatus, ProjectIcon } from './typing';

export const rawProjects: Project[] = [
	{
		title: 'E-commerce UI/UX Design Redesign',
		freelancer: 'Sarah Jenkins',
		status: ProjectStatus.InProgress,
		statusLabel: 'In Progress',
		milestone: 'Milestone 2/4',
		progress: 75,
		budget: '$2,400',
		icon: ProjectIcon.Globe,
        description: 'Redesign the entire user experience for a high-traffic e-commerce platform.',
        category: 'Product Design',
        requirements: 'Figma, React, UX Research'
	},
	{
		title: 'API Integration for Payment Gateway',
		freelancer: 'Marco Rossi',
		status: ProjectStatus.Revision,
		statusLabel: 'Revision',
		milestone: 'Milestone 1/1',
		progress: 90,
		budget: '$850',
		icon: ProjectIcon.Api,
        description: 'Implement a secure payment gateway integration using Stripe and PayPal APIs.',
        category: 'Backend',
        requirements: 'Node.js, Stripe API, Security'
	},
	{
		title: 'Smart Contract Audit',
		freelancer: 'David Lee',
		status: ProjectStatus.Completed,
		statusLabel: 'Completed',
		milestone: 'Milestone 3/3',
		progress: 100,
		budget: '$5,000',
		icon: ProjectIcon.Api,
        description: 'Comprehensive audit of smart contracts for a new DeFi protocol.',
        category: 'Security',
        requirements: 'Solidity, Slither, MythX'
	}
];
