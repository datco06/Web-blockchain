import { useState } from 'react';
import {
  rawContact,
  rawServiceSkill,
  rawPortfolioProjects,
  rawWorkHistory,
} from '@/services/freelancer/profile';
import type {
  FreelancerContact,
  Language,
  PortfolioProject,
  PricingType,
  WorkHistoryItem,
} from '@/services/freelancer/profile/typing';

export default function useFreelancerProfileModel() {
  const [contact, setContact] = useState<FreelancerContact>(rawContact);

  const updateContact = (field: keyof FreelancerContact, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const [experience, setExperience] = useState(rawServiceSkill.experience);
  const [category, setCategory] = useState(rawServiceSkill.category);
  const [skills, setSkills] = useState<string[]>(rawServiceSkill.skills);
  const [languages, setLanguages] = useState<Language[]>(rawServiceSkill.languages);
  const [pricing, setPricing] = useState<PricingType>(rawServiceSkill.pricing);
  const [rate, setRate] = useState(rawServiceSkill.rate);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setSkills((prev) => [...prev, trimmed]);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addLanguage = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLanguages((prev) => [...prev, { id: `language-${Date.now()}`, name: trimmed }]);
  };

  const removeLanguage = (id: string) => {
    setLanguages((prev) => prev.filter((lang) => lang.id !== id));
  };

  const [projects, setProjects] = useState<PortfolioProject[]>(rawPortfolioProjects);

  const addProject = (project: Omit<PortfolioProject, 'id'>) => {
    setProjects((prev) => [
      ...prev,
      { ...project, id: `project-${Date.now()}` },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const workHistory: WorkHistoryItem[] = rawWorkHistory;

  const [walletAddress, setWalletAddress] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const addLink = (link: string) => {
    const trimmed = link.trim();
    if (!trimmed) return;
    setLinks((prev) => [...prev, trimmed]);
  };

  return {
    contact,
    updateContact,
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
    projects,
    addProject,
    removeProject,
    workHistory,
    walletAddress,
    setWalletAddress,
    links,
    addLink,
    isEditing,
    setIsEditing,
  };
}
