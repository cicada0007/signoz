import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ROUTES from 'constants/routes';
import { renderAtRoute } from '@/storybook/renderAtRoute';

import { storyMocks } from '@/storybook/controls/defineStoryMocks';
import type { PageStoryArgs } from '@/storybook/runtime/resolveStory';

import {
	copyPublicUrl,
	editNameAndDescription,
	openIconPicker,
	openOverview,
	openPublish,
	openPublishPrivate,
	openPublishTimeRange,
	publishDashboard,
	saveRenamedDashboard,
	syncTooltips,
	unpublishDashboard,
	updatePublicDashboard,
} from '../__story_mockdata__/settings.play';
import { dashboardMocks } from '../DashboardPage.stories.mocks';

import DashboardPage from '../../DashboardPage';

type DashboardArgs = PageStoryArgs<typeof dashboardMocks>;

const pageStory = storyMocks(dashboardMocks, { layout: 'app' });

/**
 * The dashboard's settings drawer on its Overview and Publish tabs: the name,
 * icon, description and tags, the cross-panel sync mode, and the public link.
 * The Publish tab only exists on cloud and enterprise licenses.
 *
 * Route: `/dashboard/:dashboardId`.
 */
const meta = {
	title: 'Pages/Dashboards/Detail/Settings',
	tags: ['authz', 'play'],
	component: DashboardPage as ComponentType<DashboardArgs>,
	render: renderAtRoute(ROUTES.DASHBOARD, DashboardPage),
	...pageStory,
	parameters: { ...pageStory.parameters },
} satisfies Meta<DashboardArgs>;

export default meta;

type Story = StoryObj<DashboardArgs>;

/** The drawer as Configure opens it, on the Overview tab. */
export const Overview: Story = {
	play: openOverview,
};

/** Two fields edited, so the footer counts them and offers to save or discard. */
export const OverviewUnsavedChanges: Story = {
	play: editNameAndDescription,
};

/** The icon picker beside the name, open on the system icons. */
export const OverviewIconPicker: Story = {
	play: openIconPicker,
};

/**
 * Sync set to Tooltip, which adds the choice between every series and only the
 * ones that share the group-by.
 */
export const OverviewTooltipSync: Story = {
	play: syncTooltips,
};

/**
 * The Overview tab's own tooltip: Cross-Panel Sync explains what syncing does
 * and links out to the docs.
 */
export const TooltipsInOverview: Story = {
	args: { tooltipsOpen: true },
	play: openOverview,
};

/** The Publish tab of a dashboard with a public link. */
export const Publish: Story = {
	play: openPublish,
};

/** The Publish tab with its default time range select open. */
export const PublishTimeRangeOpen: Story = {
	play: openPublishTimeRange,
};

/** The Publish tab of a dashboard nobody published: no link, one Publish button. */
export const PublishPrivate: Story = {
	args: { published: false },
	// The 404 an unpublished dashboard answers with is the state under test.
	parameters: { allowConsoleErrors: true },
	play: openPublishPrivate,
};

/** The name edited and saved: the toast announcing the update, raised once the patch answers. */
export const OverviewSavedToast: Story = {
	play: saveRenamedDashboard,
};

/** Publish Dashboard on a private dashboard: the toast announcing the new link. */
export const PublishedToast: Story = {
	args: { published: false },
	// The 404 an unpublished dashboard answers with is the state under test.
	parameters: { allowConsoleErrors: true },
	play: publishDashboard,
};

/** Update Dashboard on a published dashboard: the toast confirming the new settings. */
export const PublicUpdatedToast: Story = {
	play: updatePublicDashboard,
};

/** Unpublish Dashboard: the toast confirming the link is gone. */
export const UnpublishedToast: Story = {
	play: unpublishDashboard,
};

/** The copy button beside the public link: the toast confirming the copy. */
export const PublicUrlCopiedToast: Story = {
	play: copyPublicUrl,
};
