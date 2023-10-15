import React, { useState, useEffect } from 'react';

const managers = [
	'Joe',
	'TJ',
	'Jeff',
	'Eric',
	'Gordon',
	'Garret',
	'Steve',
	'Matt',
];

// Function to shuffle the array using sort
function shuffleManagers(array) {
	return array.slice().sort(() => Math.random() - 0.5);
}

const shuffledManagers = shuffleManagers(managers);

const ManagerSelector = () => {
	const [remainingManagers, setRemainingManagers] =
		useState(shuffledManagers);
	const [selectedManager, setSelectedManager] = useState('');
	const [draftPickChoiceOrder, setDraftPickChoiceOrder] = useState([]);
	const [buttonName, setButtonName] = useState(remainingManagers[0]);
	const [newSelection, setNewSelection] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			const remainingNonDisplayedManagers = remainingManagers.filter(
				(manager) => manager !== buttonName
			);
			const randomIndex = Math.floor(
				Math.random() * remainingNonDisplayedManagers.length
			);
			const currentButtonName =
				remainingNonDisplayedManagers[randomIndex];
			setButtonName(currentButtonName);
		}, 250);

		return () => clearInterval(interval);
	}, [remainingManagers, setButtonName, buttonName]);

	const selectRandomManager = () => {
		const randomIndex = Math.floor(
			Math.random() * remainingManagers.length
		);
		const currentSelectedManager = remainingManagers[randomIndex];
		setSelectedManager(currentSelectedManager);
		setRemainingManagers((prev) =>
			prev.filter((manager) => manager !== currentSelectedManager)
		);
	};

	useEffect(() => {
		if (!selectedManager) return;
		setDraftPickChoiceOrder((prev) => [...prev, selectedManager]);
		setNewSelection(selectedManager);
	}, [selectedManager, setDraftPickChoiceOrder]);

	return (
		<>
			<div>
				<button onClick={selectRandomManager}>
					{newSelection ? (
						<span style={{ textAlign: 'center', flexGrow: '1' }}>
							...
						</span>
					) : (
						`${draftPickChoiceOrder.length + 1}. ${buttonName}`
					)}
				</button>
			</div>
			{draftPickChoiceOrder.length > 0 && (
				<div className="draft-choice-order">
					<h2 style={{ listStyleType: 'none', fontWeight: 'bold' }}>
						Draft Choice Order
					</h2>
					<ol>
						{draftPickChoiceOrder.map((manager) => (
							<li key={manager}>{manager}</li>
						))}
					</ol>
				</div>
			)}
			{newSelection && (
				<div
					className="new-selection"
					onClick={() => setNewSelection('')}
				>
					<div className="overlay"></div>
					<div className="selected-manager">{newSelection}</div>
				</div>
			)}
		</>
	);
};

export default ManagerSelector;
