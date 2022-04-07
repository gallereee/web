import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column, SpinnerIcon } from "@bd-dm/ui";
import { isString, isUndefined } from "lodash";
import { PostPhotos } from "components/PostPhotos";
import { getPost, getRunningOperationPromises, useGetPostQuery } from "api";
import { storeWrapper } from "store";

const PostPage: NextPage = () => {
	const {
		query: { id },
	} = useRouter();

	const { data: post, isLoading } = useGetPostQuery(id as string, {
		skip: isUndefined(id),
	});

	if (isLoading) {
		return <SpinnerIcon />;
	}

	if (isUndefined(post)) {
		return null;
	}

	return (
		<Column>
			<PostPhotos photos={post.photos} />
		</Column>
	);
};

const getServerSideProps = storeWrapper.getServerSideProps(
	(store) => async (context) => {
		const { id } = context.query;
		if (isString(id)) {
			store.dispatch(getPost.initiate(id));
		}
		const [getPostResult] = await Promise.all<any>(
			getRunningOperationPromises()
		);

		if (getPostResult.isError && getPostResult.error?.status === 404) {
			return {
				notFound: true,
			};
		}

		return {
			props: {},
		};
	}
);

export { getServerSideProps };
export default PostPage;
