import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column } from "@bd-dm/ui";
import { isUndefined } from "lodash";
import { PostPhotos } from "components/PostPhotos";

const PostPage: NextPage = () => {
	const {
		query: { id },
	} = useRouter();

	if (isUndefined(id)) {
		return null;
	}

	return (
		<Column>
			<PostPhotos id={id as string} />
		</Column>
	);
};

export default PostPage;
