/**
 * Nodeview tabs
 *  Tabs can be disabled by setting the <div id="content"> tabsenabled attribute to false
 */

var tabsEnabled,
	content,
	tabsContainer,
	tabs,
	activeTab;

$(document).ready(function() {
	content = $('#content');
	tabsEnabled = content.attr('data-tabsenabled') == 'true';
	tabsContainer = $('.tabs');
	tabs = tabsContainer.find('li');

	// Get active tab
	var qs = new Querystring();
	if (qs.contains('cat'))
		activeTab = tabs.filter(function() { return $(this).text().trim() == qs.get('cat'); });
	else
		activeTab = tabs.first();


	// If tabs are disabled, they will serve as links to jump to categories
	if (!tabsEnabled) {
		tabs.each(function() {
			var text = $(this).text();
			$(this).html('<a href="#' + text + '">' + text + '</a>');
		});

		return;
	}

	activeTab.addClass('active');

	tabs.click(function() {
		activeTab = $(this);

		tabs.removeClass('active');
		activeTab.addClass('active');

		// Hide all categories
		$('div[data-category]').hide();
		// Show the right one
		$('div[data-category="' + activeTab.text() + '"]').show();

		// Save state in URL
		saveState('cat', activeTab.text());
	});

	// If there's an active filter, hide tabs
	if (qs.contains('filter'))
		hideTabs();
	else
		showTabs();
});

/**
 * Called on filter search begins
 */
function showTabs() {
	if (!tabsEnabled)
		return;

	// If tabs are already shown, don't do anything
	if (content.attr('data-tabs') == 'true')
		return;

	content.attr('data-tabs', 'true');

	// Only show activeTab category
	$('div[data-category]').not('[data-category="' + activeTab.text() + '"]').hide();
}

/**
 * Called on filter search ends
 */
function hideTabs() {
	if (!tabsEnabled)
		return;

	// If tabs are already hidden, don't do anything
	if (content.attr('data-tabs') == 'false')
		return;

	content.attr('data-tabs', 'false');

	// Show back every hidden category
	$('div[data-category]').show();
}
