from django import template
from django.templatetags.static import static

from netbox_napalm_plugin import __version__

register = template.Library()


@register.simple_tag
def static_versioned(path):
    """
    Like {% static %}, but appends the plugin's own version as a cache-busting query
    string (mirroring how NetBox core versions its own bundled assets), so a browser
    that already cached a prior release's JS/CSS re-fetches it after an upgrade instead
    of silently continuing to run stale code until its cache entry expires.
    """
    return f"{static(path)}?v={__version__}"
