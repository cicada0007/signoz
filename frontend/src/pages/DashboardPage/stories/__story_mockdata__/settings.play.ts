/**
 * AI-owned. Generated and maintained by the `signoz-page-story` skill.
 * Do not hand-edit: regenerate instead.
 */

import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import type { PageStoryArgs } from '@/storybook/runtime/resolveStory';

import {
	type dashboardMocks,
	openSettings,
	PAGE_LOAD,
} from '../DashboardPage.stories.mocks';

interface PlayContext {
	canvasElement: HTMLElement;
	args: PageStoryArgs<typeof dashboardMocks>;
}

/** Publish actions render busy until the public dashboard request settles. */
const clickWhenReady = async (testId: string): Promise<void> => {
	const button = await screen.findByTestId(testId, {}, PAGE_LOAD);
	await waitFor(
		() => expect(button).not.toHaveAttribute('aria-busy', 'true'),
		PAGE_LOAD,
	);
	await userEvent.click(button);
};

export const openOverview = async ({
	canvasElement,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement);
	await screen.findByText('Sync Mode');
};

export const editNameAndDescription = async ({
	canvasElement,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement);
	await userEvent.type(await screen.findByTestId('dashboard-name'), ' (v2)');
	await userEvent.type(
		screen.getByTestId('dashboard-desc'),
		' Owned by the platform team.',
	);
	await screen.findByText('2 unsaved changes');
};

export const openIconPicker = async ({
	canvasElement,
}: PlayContext): Promise<void> => {
	const panel = await openSettings(canvasElement);

	await userEvent.click(within(panel).getAllByRole('combobox')[0]);
	await screen.findByRole('listbox');
};

export const syncTooltips = async ({
	canvasElement,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement);
	await userEvent.click(await screen.findByRole('radio', { name: 'Tooltip' }));
	await screen.findByText('Synced Tooltip Series');
};

export const openPublish = async ({
	canvasElement,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement, 'Publish');
	await screen.findByText('Default time range');
};

export const openPublishTimeRange = async (
	context: PlayContext,
): Promise<void> => {
	await openPublish(context);
	await userEvent.click(
		within(screen.getByRole('tabpanel')).getByRole('combobox'),
	);
	await screen.findByRole('listbox');
};

export const openPublishPrivate = async ({
	canvasElement,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement, 'Publish');
	await screen.findByText('This dashboard is private');
};

export const saveRenamedDashboard = async ({
	canvasElement,
	args,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement);
	await userEvent.type(await screen.findByTestId('dashboard-name'), ' (v2)');
	await userEvent.click(await screen.findByTestId('save-dashboard-config'));
	if (args.dashboardPatch === 'success') {
		await screen.findByText('Dashboard updated');
	}
};

export const publishDashboard = async ({
	canvasElement,
	args,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement, 'Publish');
	await clickWhenReady('public-dashboard-publish');
	if (args.publicWrite === 'success') {
		await screen.findByText('Dashboard published successfully');
	}
};

export const updatePublicDashboard = async ({
	canvasElement,
	args,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement, 'Publish');
	await clickWhenReady('public-dashboard-update');
	if (args.publicWrite === 'success') {
		await screen.findByText('Public dashboard updated successfully');
	}
};

export const unpublishDashboard = async ({
	canvasElement,
	args,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement, 'Publish');
	await clickWhenReady('public-dashboard-unpublish');
	if (args.publicWrite === 'success') {
		await screen.findByText('Dashboard unpublished successfully');
	}
};

export const copyPublicUrl = async ({
	canvasElement,
}: PlayContext): Promise<void> => {
	await openSettings(canvasElement, 'Publish');
	await userEvent.click(
		await screen.findByRole('button', { name: 'Copy link' }),
	);
	await screen.findByText('Copied public dashboard URL successfully');
};
