import { useState, useEffect } from 'react';

import BlogCategoryForm, { ICatItem } from './BlogCategoryForm';

const CAT_PAGINATION = 20;

const BotCatPanel = () => {
  const [categories, setCategories] = useState<Array<ICatItem>>([]);
  const [searchCats, setSearchCats] = useState<Array<ICatItem>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCat, setCurrentCat] = useState<ICatItem>();

  useEffect(() => {
    setSearchCats([...categories].sort());
  }, [categories]);
  // useEffect(() => {
  //   console.log(currentCat);
  // }, [currentCat]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/blog/category/get-all', {
        method: 'GET',
      });
      const body = await response.json();
      setCategories([...body.data]);
    })();
  }, []);
  function onSearching(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchCats(categories?.filter((p) => p.slug.includes(e.target.value)));
  }

  const onCatItemUpdate = (id: string, item: ICatItem) => {
    setCurrentCat(item);
    setCategories((cats) => {
      if (id === 'new') return [...cats, item];
      return item === null
        ? cats.filter((c) => c.slug !== id)
        : cats.map((c) => (c.slug === id ? item : c));
    });
  };

  const onClickAdd = () => {
    setCurrentCat({ slug: '_new_', name: 'name' });
  };

  return (
    <>
      <div className="text-xl font-bold my-6">Category</div>
      <div className="flex flex-col xl:flex-row">
        <div className="min-w-[500px] xl:border-r xl:pr-10 xl:mr-10 xl:border-gray-500 xl:mb-0 mb-20">
          <div className="flex items-end">
            <div
              onClick={onClickAdd}
              className="hover:cursor-pointer ml-auto w-24 text-center py-2 bg-blue-600 text-white rounded right my-2"
            >
              Thêm
            </div>
          </div>
          <div className="bg-white pb-4 px-4 rounded-md w-full">
            <div className="flex justify-between w-full pt-6 ">
              <p className="ml-3"></p>
            </div>
            <div className="w-full flex justify-end px-2 mt-2">
              <div className="w-full sm:w-64 inline-block relative ">
                <input
                  type=""
                  name=""
                  onChange={(e) => onSearching(e)}
                  className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
                  placeholder="Search by slug"
                />
                <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
                  <svg
                    className="fill-current h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 511.999 511.999"
                  >
                    <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto mt-6">
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                    <th className="px-4 py-2 bg-gray-200">Slug</th>
                    <th className="px-4 py-2 ">Name</th>
                    <th className="px-4 py-2 "></th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {searchCats
                    ?.slice(
                      CAT_PAGINATION * currentPage,
                      CAT_PAGINATION * (currentPage + 1)
                    )
                    .map((cat) => (
                      <tr
                        key={cat.slug}
                        className="hover:bg-gray-100 border-b border-gray-200 py-10"
                      >
                        <td className="px-4 py-4">
                          <a href={`/blogs/category/${cat.slug}`}>{cat.slug}</a>
                        </td>
                        <td className="px-2 py-2">{cat.name}</td>
                        <td
                          className="px-2 py-2 hover:cursor-pointer"
                          onClick={() => setCurrentCat(cat)}
                        >
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                          </svg>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div
              id="pagination"
              className="w-full flex justify-center border-t border-gray-100 pt-4 items-center"
            >
              {/* <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.4">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071L13.2929 16.7072C13.6834 17.0977 14.3166 17.0977 14.7071 16.7072C15.0977 16.3167 15.0977 15.6835 14.7071 15.293L11.4142 12L14.7071 8.70712C15.0977 8.31659 15.0977 7.68343 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12Z" fill="#2C2C2C" />
                </g>
              </svg> */}
              {[
                ...Array(
                  Math.ceil((searchCats?.length ?? 0) / CAT_PAGINATION)
                ).keys(),
              ].map((n) => (
                <div
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={
                    `${n === currentPage ? 'underline' : ''} ` +
                    `p-2 border-1 leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-700 text-sm`
                  }
                >
                  {n + 1}
                </div>
              ))}
              {/* <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 12C15 11.7348 14.8946 11.4804 14.7071 11.2929L10.7071 7.2929C10.3166 6.9024 9.6834 6.9024 9.2929 7.2929C8.9024 7.6834 8.9024 8.3166 9.2929 8.7071L12.5858 12L9.2929 15.2929C8.9024 15.6834 8.9024 16.3166 9.2929 16.7071C9.6834 17.0976 10.3166 17.0976 10.7071 16.7071L14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12Z" fill="#18A0FB" />
              </svg> */}
            </div>
          </div>
        </div>
        {currentCat && (
          <BlogCategoryForm
            defaultValue={currentCat}
            onUpdate={onCatItemUpdate}
          ></BlogCategoryForm>
        )}
      </div>
    </>
  );
};

export default BotCatPanel;
