#!/usr/bin/env python

"""The setup script."""

from setuptools import setup, find_packages

with open('README.md') as readme_file:
    readme = readme_file.read()

requirements = []

setup(
    author="Arthur Hanson",
    author_email='ahanson@netboxlabs.com',
    python_requires='>=3.8',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
    ],
    description="NetBox plugin for Napalm.",
    install_requires=requirements,
    long_description=readme,
    include_package_data=True,
    keywords='netbox_napalm_plugin',
    name='netbox_napalm_plugin',
    packages=find_packages(include=['netbox_napalm_plugin', 'netbox_napalm_plugin.*']),
    test_suite='tests',
    url='https://github.com/arthanson/netbox_napalm_plugin',
    version='0.1.0',
    zip_safe=False,
)
