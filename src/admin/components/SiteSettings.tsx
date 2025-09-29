import React, { useEffect, useState } from 'react';

import { IAppConfig, IAppConfigLink } from '../../utils/Content';

const SiteSettings = () => {
  const [config, setConfig] = useState<IAppConfig>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/siteSetting/get', {
        method: 'GET',
      });
      const body = await response.json();
      setConfig(body.data);
      // console.log(body.data);
    })();
  }, []);

  function convertLinksData2Text(links: IAppConfigLink[]): string {
    return links.map((l) => `${l.url}||${l.name}`).join('\n');
  }

  function textAreaAdjust(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = '1px';
    e.currentTarget.style.height = `${25 + e.currentTarget.scrollHeight}px`;
  }
  function textAreaInit(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
    e.currentTarget.style.height = '1px';
    e.currentTarget.style.height = `${25 + e.currentTarget.scrollHeight}px`;
  }

  const onSaveSetting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // console.log('onSaveSetting');
    const formData = new FormData(e.currentTarget);
    const object: Record<string, string> = {};
    formData.forEach((value, key) => {
      object[key] = value.toString();
    });
    const json = JSON.stringify(object);
    const response = await fetch('/api/siteSetting/update', {
      method: 'POST',
      body: json,
    });

    if (response.ok) {
      // router.reload();
      setErrorMessage('Saved!');
    } else setErrorMessage('Faild to save');
    setTimeout(() => setErrorMessage(''), 3000);
    setLoading(false);
  };

  return (
    <div className="w-full px-20 py-10 overflow-y-scroll max-h-screen">
      <div className="text-2xl font-bold mb-16">Site Settings</div>
      <div>
        <form
          className="max-w-[800px] flex flex-col"
          onSubmit={(e) => onSaveSetting(e)}
        >
          <div>
            <div className="text-lg font-bold my-4">SEO</div>
            <div className="mb-6">
              <label
                htmlFor="seo-site_name"
                className="block text-base text-gray-800 mb-1"
              >
                site_name
              </label>
              <input
                type="text"
                id="seo-site_name"
                name="seo-site_name"
                defaultValue={config?.seo.site_name ?? ''}
                className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="seo-site_title"
                className="block text-base text-gray-800 mb-1"
              >
                site_title
              </label>
              <input
                type="text"
                id="seo-site_title"
                name="seo-site_title"
                defaultValue={config?.seo.site_title ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="seo-site_description"
                className="block text-base text-gray-800 mb-1"
              >
                site_description
              </label>
              <input
                type="text"
                id="seo-site_description"
                name="seo-site_description"
                defaultValue={config?.seo.site_description ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="seo-url"
                className="block text-base text-gray-800 mb-1"
              >
                url
              </label>
              <input
                type="text"
                id="seo-url"
                name="seo-url"
                defaultValue={config?.seo.url ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="seo-author"
                className="block text-base text-gray-800 mb-1"
              >
                author
              </label>
              <input
                type="text"
                id="seo-author"
                name="seo-author"
                defaultValue={config?.seo.author ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold my-4">Header</div>
            <div className="mb-6">
              <label
                htmlFor="header-title"
                className="block text-base text-gray-800 mb-1"
              >
                title
              </label>
              <input
                type="text"
                id="header-title"
                name="header-title"
                defaultValue={config?.header.title ?? ''}
                className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
              <p className="text-xs text-gray-500">
                <b>Format: </b>
                {'<Dòng 1>|<Dòng 2>|<Dòng 3>'}
              </p>
            </div>
            <div className="mb-6">
              <label
                htmlFor="header-description"
                className="block text-base text-gray-800 mb-1"
              >
                description
              </label>
              <input
                type="text"
                id="header-description"
                name="header-description"
                defaultValue={config?.header.description ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold my-4">Contact</div>
            <div className="mb-6">
              <label
                htmlFor="contact-phone"
                className="block text-base text-gray-800 mb-1"
              >
                phone
              </label>
              <input
                type="phone"
                id="contact-phone"
                name="contact-phone"
                defaultValue={config?.contact.phone ?? ''}
                className="w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="contact-email"
                className="block text-base text-gray-800 mb-1"
              >
                email
              </label>
              <input
                type="email"
                id="contact-email"
                name="contact-email"
                defaultValue={config?.contact.email ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="contact-address1"
                className="block text-base text-gray-800 mb-1"
              >
                address (head quater)
              </label>
              <input
                type="text"
                id="contact-address1"
                name="contact-address1"
                defaultValue={config?.contact.address1 ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="contact-address2"
                className="block text-base text-gray-800 mb-1"
              >
                address (branch)
              </label>
              <input
                type="text"
                id="contact-address2"
                name="contact-address2"
                defaultValue={config?.contact.address2 ?? ''}
                className="w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="hidden">
            <div className="text-lg font-bold my-4">Navbar</div>
            <div className="mb-6">
              <label
                htmlFor="navbar-links"
                className="block text-base text-gray-800 mb-1"
              >
                links
              </label>
              <textarea
                onFocus={(e) => textAreaInit(e)}
                onKeyUp={(e) => textAreaAdjust(e)}
                id="navbar-links"
                name="navbar-links"
                defaultValue={config?.navbar.links ?? ''} // convertLinksData2Text(config?.navbar.links ?? [])
                className="overflow-hidden w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              ></textarea>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold my-4">Footer</div>
            <div className="mb-6">
              <label
                htmlFor="footer-links"
                className="block text-base text-gray-800 mb-1"
              >
                links
              </label>
              <textarea
                onFocus={(e) => textAreaInit(e)}
                onKeyDown={(e) => textAreaAdjust(e)}
                id="footer-links"
                name="footer-links"
                defaultValue={convertLinksData2Text(config?.footer.links ?? [])}
                className="overflow-hidden w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              ></textarea>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold my-4">Blog</div>
            <div className="mb-6">
              <label
                htmlFor="blogs-slugs"
                className="block text-base text-gray-800 mb-1"
              >
                blogs
              </label>
              <textarea
                onFocus={(e) => textAreaInit(e)}
                onKeyDown={(e) => textAreaAdjust(e)}
                id="blogs-slugs"
                name="blogs-slugs"
                defaultValue={(config?.blogs.slugs ?? []).join('\n')}
                className="overflow-hidden w-full px-4 py-2 border text-sm text-gray-800 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              ></textarea>
            </div>
          </div>
          <p className="text-sm text-gray-600 py-4">{errorMessage}</p>
          <label
            htmlFor="form-submit"
            className="flex gap-2 items-center justify-center hover:cursor-pointer hover:shadow-form w-full rounded-md bg-indigo-600 py-2 px-8 text-center text-base font-semibold text-white outline-none"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-t-transparent border-solid animate-spin rounded-full border-gray-100 border-2"></div>
                Saving
              </>
            ) : (
              'Save'
            )}
          </label>
          <input id="form-submit" hidden={true} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SiteSettings;
