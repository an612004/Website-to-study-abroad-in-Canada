import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export interface ICatItem {
  slug: string;
  name: string;
  description?: string;
}

enum SavingStatus {
  None,
  Saved,
  Created,
  Failed,
  Nothing,
}

const SavingStatusText = ({ savingStatus }: { savingStatus: SavingStatus }) => {
  switch (savingStatus) {
    case SavingStatus.Nothing:
      return (
        <div className={'text-sm h-10 text-yellow-500'}>Nothing to save</div>
      );
    case SavingStatus.Failed:
      return <div className={'text-sm h-10 text-red-500'}>Failed</div>;
    case SavingStatus.Saved:
      return <div className={'text-sm h-10 text-green-500'}>Saved</div>;
    case SavingStatus.Created:
      return <div className={'text-sm h-10 text-green-500'}>Created</div>;
    default:
      return <div className={'text-sm h-10'}></div>;
  }
};

const BlogCategoryForm = (props: {
  defaultValue: ICatItem;
  onUpdate: (id: string, item: ICatItem) => void;
}) => {
  const { defaultValue, onUpdate } = props;
  const [catItem, setCatItem] = useState<ICatItem>(defaultValue);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SavingStatus>(SavingStatus.None);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const router = useRouter();

  const isCreateNew = () => defaultValue.slug === '_new_';
  useEffect(() => {
    setCatItem(defaultValue);
  }, [defaultValue]);

  const resetWaitLoad = () => {
    setTimeout(() => {
      setSaveStatus(SavingStatus.None);
    }, 4000);
    setSaving(false);
  };

  const onClickSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const fSlug = catItem.slug;
    const fName = catItem.name;
    const validSlug =
      fSlug != null &&
      fSlug !== undefined &&
      fSlug !== '_new_' &&
      fSlug.length >= 3;
    const validName = fName != null && fName !== undefined && fName.length >= 3;

    if (!validName || !validSlug) setSaveStatus(SavingStatus.Failed);

    if (isCreateNew()) {
      const dataCat = { ...catItem };

      const response = await fetch('/api/blog/category/add', {
        method: 'POST',
        body: JSON.stringify(dataCat),
      });

      if (response.ok) {
        setSaveStatus(SavingStatus.Created);
        const body = await response.json();
        const { data } = body;
        // setCatItem(data);
        // router.reload();
        onUpdate('new', data);
        resetWaitLoad();
        return;
      }
      setSaveStatus(SavingStatus.Failed);
    } else {
      const dataCat = { oldSlug: defaultValue.slug, ...catItem };
      const response = await fetch('/api/blog/category/update', {
        method: 'POST',
        body: JSON.stringify(dataCat),
      });

      if (response.ok) {
        setSaveStatus(SavingStatus.Saved);
        const body = await response.json();
        const { data } = body;
        // setCatItem(data);
        onUpdate(data.slug, data);
        resetWaitLoad();
        return;
      }
      setSaveStatus(SavingStatus.Failed);
    }

    resetWaitLoad();
  };

  const onClickDelete = () => {
    if (deleteConfirm) return;
    setDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  const onDeleteConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDict: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDict[key] = value;
    });
    if (formDict['slug-confirm-removing'] === catItem.slug) {
      const keepFiles = formDict['delete-childs'] !== 'on';
      const response = await fetch('/api/blog/category/delete', {
        method: 'POST',
        body: JSON.stringify({ slug: catItem.slug, keepFiles }),
      });

      if (response.ok) {
        router.reload();
      } else alert('Xóa thất bại');
    } else alert('Nhập sai, xác nhận xóa đã hủy');
    setDeleteConfirm(false);
  };

  return (
    <div className="min-w-[700px]">
      <div className="text-lg font-bold text-black py-4 mb-6">Chi tiết</div>
      <form onSubmit={(e) => onClickSave(e)} autoComplete="off">
        <div className="mb-6">
          <label
            htmlFor="slug"
            className="block text-base font-medium text-gray-800 mb-1"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            minLength={3}
            pattern="[a-z0-9\-]{3,}"
            onChange={(e) =>
              setCatItem((v) => ({ ...v, slug: e.target.value }))
            }
            value={catItem.slug}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
          <p className="text-xs italic text-gray-600">
            Lớn hơn 3 ký tự. Chỉ chứa chữ thường a,b,c..z, số 0-9 và dấu gạch
            ngang -
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-base font-medium text-gray-800 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            minLength={5}
            onChange={(e) =>
              setCatItem((v) => ({ ...v, name: e.target.value }))
            }
            value={catItem.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
          <p className="text-xs italic text-gray-600">Lớn hơn 3 ký tự</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-base font-medium text-gray-800 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={(e) =>
              setCatItem((v) => ({ ...v, description: e.target.value }))
            }
            className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={catItem.description}
          />
        </div>
        <SavingStatusText savingStatus={saveStatus}></SavingStatusText>
        <div className="flex gap-2">
          <label
            htmlFor="save-submit"
            className="flex gap-2 w-32 items-center justify-center hover:cursor-pointer hover:shadow-form rounded-md bg-blue-600 py-3 text-center text-base font-semibold text-white outline-none"
          >
            {saving ? (
              <>
                {isCreateNew() ? 'Creating' : 'Saving'}
                <div className="h-4 w-4 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
              </>
            ) : (
              <>{isCreateNew() ? 'Create' : 'Save'}</>
            )}
          </label>
          <input
            id="save-submit"
            type="submit"
            disabled={saving}
            hidden={true}
          />
        </div>
      </form>
      {!isCreateNew() && (
        <div className="my-12 flex">
          <div className="w-[200px]">
            <p className="my-2">Delete this category</p>
            <div
              onClick={onClickDelete}
              className="hover:cursor-pointer w-20 bg-red-500 text-white py-2 px-4 rounded text-center"
            >
              Xóa
            </div>
          </div>
          {deleteConfirm && (
            <form
              className="flex items center gap-2 items-center"
              onSubmit={(e) => onDeleteConfirm(e)}
              autoComplete="off"
            >
              <div className="">
                <label htmlFor="slug-confirm-removing" className="text-sm">
                  Vui lòng nhập slug của category vào ô bên dưới đễ xác nhận
                  xóa: <br /> <b>{catItem.slug}</b>
                </label>
                <input
                  id="slug-confirm-removing"
                  name="slug-confirm-removing"
                  className="text-sm w-full px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:border-gray-800"
                  type="text"
                />
                <div className="items-center">
                  <input
                    id="delete-childs"
                    name="delete-childs"
                    className="text-sm w-6 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:border-gray-800"
                    type="checkbox"
                  />
                  <label htmlFor="delete-childs" className="text-sm">
                    Xóa tất cả các blog con
                  </label>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <input
                  type="submit"
                  className="hover:cursor-pointer bg-red-500 text-white py-2 px-4 rounded text-center"
                />
                <div
                  onClick={cancelDelete}
                  className="hover:cursor-pointer border border-red-500 text-red-500 py-2 px-4 rounded text-center"
                >
                  Hủy
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
export default BlogCategoryForm;
