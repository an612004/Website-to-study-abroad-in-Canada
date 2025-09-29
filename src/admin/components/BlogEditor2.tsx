import React, { useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SunEditorCore from 'suneditor/src/lib/core';

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import ImageInput from './ImageInput';
import { imageKitExtract } from '../../utils/Common';
import { IPostEditorProps } from '../../utils/Content';

enum SavingStatus {
  None,
  Saved,
  Failed,
  Nothing,
}

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const SavingStatusText = ({ savingStatus }: { savingStatus: SavingStatus }) => {
  // console.log(savingStatus);
  switch (savingStatus) {
    case SavingStatus.Nothing:
      return (
        <div className={'text-sm h-10 text-yellow-500'}>Nothing to save</div>
      );
    case SavingStatus.Failed:
      return <div className={'text-sm h-10 text-red-500'}>Failed</div>;
    case SavingStatus.Saved:
      return <div className={'text-sm h-10 text-green-500'}>Saved</div>;
    default:
      return <div className={'text-sm h-10'}></div>;
  }
};

const BlogEditor2 = (props: IPostEditorProps) => {
  const editor = useRef<SunEditorCore>();
  const [thumbnail, setThumbnail] = useState<File>();
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [content, setContent] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [publishStatus, setPublishStatus] = useState<number | undefined>(
    undefined
  );
  const [saveStatus, setSaveStatus] = useState<SavingStatus>(SavingStatus.None);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const router = useRouter();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const onImageSelect = (image: any) => {
    setThumbnail(image);
  };

  const isCreateNew = () => props.slug === 'new';

  const resetWaitLoad = () => {
    setTimeout(() => {
      setSaveStatus(SavingStatus.None);
    }, 4000);
    setSaving(false);
  };

  const onClickSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const body = new FormData();
    // console.log("file", image)

    if (thumbnail) body.append('image', thumbnail);
    if (category) body.append('category', category);
    if (title) body.append('title', title);
    if (description) body.append('description', description);
    if (content) body.append('content', content);
    if (publishStatus !== undefined)
      body.append('status', publishStatus.toString());

    const isEmpty = body.entries().next().done;
    if (!isEmpty) {
      if (isCreateNew()) {
        const response = await fetch('/api/blog/create', {
          method: 'POST',
          body,
        });

        if (response.ok) {
          setSaveStatus(SavingStatus.Saved);
          const data = await response.json();
          router.replace(`/admin/blog/${data.slug}`);
          resetWaitLoad();
          return;
        }
        setSaveStatus(SavingStatus.Failed);
      } else {
        body.append('slug', props.slug);
        const response = await fetch('/api/blog/update', {
          method: 'POST',
          body,
        });

        if (response.ok) {
          setSaveStatus(SavingStatus.Saved);
          router.replace(`/admin/blog/${props.slug}`);
          resetWaitLoad();
          return;
        }
        setSaveStatus(SavingStatus.Failed);
      }
      // hide status
    } else setSaveStatus(SavingStatus.Nothing);

    resetWaitLoad();
  };

  function onChangeStatus(
    e: React.SyntheticEvent<HTMLSelectElement, Event>
  ): void {
    e.preventDefault();
    // console.log(
    //   'onChangeStatus',
    //   e.currentTarget.value,
    //   parseInt(e.currentTarget.value, 2)
    // );
    setPublishStatus(parseInt(e.currentTarget.value, 2));
  }

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
    const formDict: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDict[key] = value.toString();
    });
    if (formDict['slug-confirm-removing'] === props.slug) {
      const response = await fetch('/api/blog/delete', {
        method: 'POST',
        body: JSON.stringify({ slug: props.slug }),
      });

      if (response.ok) {
        router.replace('/admin/blog');
      } else alert('Xóa thất bại');
    } else alert('Nhập sai, xác nhận xóa đã hủy');
    setDeleteConfirm(false);
  };

  return (
    <div className="w-full">
      <div className="w-2/3 min-w-[1000px] px-20 py-32">
        <div className="text-2xl font-bold mb-10">
          Blog Editor
          <Link href="/admin/blog" className="text-base float-right">
            Trở lại
          </Link>
        </div>
        <form onSubmit={(e) => onClickSave(e)}>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Category
            </label>
            <select
              className="border-2 border-gray-300 border-r p-2 min-w-[200px]"
              onChange={(e) => setCategory(e.target.value)}
              // onSelect={(e) => onChangeStatus(e)}
              defaultValue={props.category ?? 'None'}
              name="category"
              id="category"
            >
              {[
                { slug: 'none', name: 'None' },
                ...(props.listCategory || []),
              ].map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              spellCheck={false}
              id="title"
              name="title"
              minLength={20}
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={props.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
            <p className="text-xs italic text-gray-600">Lớn hơn 20 ký tự</p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Description
            </label>
            <textarea
              spellCheck={false}
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              defaultValue={props.description}
            />
          </div>
          <div className="mb-6">
            <ImageInput
              lable={'Thumbnail'}
              onImage={onImageSelect}
              defaultSrc={imageKitExtract(props?.image ?? '')?.url ?? ''}
            ></ImageInput>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800 mb-1">
              Content
            </label>
            <SunEditor
              onChange={setContent}
              defaultValue={props.content}
              setOptions={{
                buttonList: [
                  ['font', 'fontSize', 'formatBlock'],
                  [
                    'bold',
                    'underline',
                    'italic',
                    'strike',
                    'subscript',
                    'superscript',
                  ],
                  ['align', 'horizontalRule', 'list', 'table'],
                  ['fontColor', 'hiliteColor'],
                  ['outdent', 'indent'],
                  ['undo', 'redo'],
                  ['removeFormat'],
                  ['outdent', 'indent'],
                  ['link', 'image'],
                  ['preview', 'print'],
                  ['fullScreen', 'showBlocks', 'codeView'],
                ],
              }}
              getSunEditorInstance={getSunEditorInstance}
              height="60vh"
            />
          </div>
          <SavingStatusText savingStatus={saveStatus}></SavingStatusText>
          <div className="flex gap-2">
            <select
              className="border-2 border-gray-300 border-r p-2"
              onChange={(e) => onChangeStatus(e)}
              // onSelect={(e) => onChangeStatus(e)}
              defaultValue={props.status ?? 0}
              name="action"
            >
              <option value={1}>Save and Publish</option>
              <option value={0}>Save Draft</option>
            </select>
            <label
              htmlFor="save-submit"
              className="flex gap-2 w-40 items-center justify-center hover:cursor-pointer hover:shadow-form rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              {saving ? (
                <>
                  Saving
                  <div className="h-4 w-4 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
                </>
              ) : (
                'Save'
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
          <div className="my-40 flex">
            <div className="w-[200px]">
              <p className="my-2">Xóa bài biết</p>
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
                <div className="flex flex-col">
                  <label htmlFor="slug-confirm-removing" className="text-sm">
                    Vui lòng nhập slug bài biết vào ô bên dưới đễ xác nhận xóa:{' '}
                    <br /> <b>{props.slug}</b>
                  </label>
                  <input
                    id="slug-confirm-removing"
                    name="slug-confirm-removing"
                    className="text-sm w-full px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:border-gray-800"
                    type="text"
                  />
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
    </div>
  );
};
export default BlogEditor2;
