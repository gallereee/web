import { useState, VFC } from "react";
import { Button, Column, Dropdown, Font, Modal, Row } from "@bd-dm/ui";
import { Account, Post, useDeletePostMutation } from "api";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

interface PostDropdownProps {
	postId: Post["id"];
	username: Account["username"];
}

enum DropdownAction {
	DELETE,
}

const PostDropdown: VFC<PostDropdownProps> = ({ postId, username }) => {
	const [isDeleteConfirmationOpened, setIsDeleteConfirmationOpened] =
		useState(false);

	const { push } = useRouter();
	const [deletePostMutation, { isLoading: isDeletePostLoading }] =
		useDeletePostMutation();

	const onDropdownAction = (action: DropdownAction) => () => {
		switch (action) {
			case DropdownAction.DELETE: {
				setIsDeleteConfirmationOpened(true);
				break;
			}
			default: {
				break;
			}
		}
	};

	const closeDeleteConfirmationModal = () => {
		setIsDeleteConfirmationOpened(false);
	};

	const deletePost = async () => {
		await deletePostMutation(postId);
		await push(`/accounts/${username}`);
		closeDeleteConfirmationModal();
	};

	return (
		<>
			<div className={styles.dropdown}>
				<Dropdown>
					<Dropdown.Button />
					<Dropdown.List
						items={[
							{
								children: "Удалить",
								onClick: onDropdownAction(DropdownAction.DELETE),
							},
						]}
						position={Dropdown.ListPosition.RIGHT}
					/>
				</Dropdown>
			</div>
			<Modal
				backdropClassName={styles["delete-confirm-modal"]}
				isOpened={isDeleteConfirmationOpened}
				closeHandler={closeDeleteConfirmationModal}
			>
				<Modal.Header>Удаление фото</Modal.Header>
				<Modal.Body>
					<Column>
						<Font>Вы уверены, что хотите удалить фото?</Font>
						<br />
						<Row
							className={styles["modal-buttons"]}
							horizontalAlignment={Row.HorizontalAlignment.CENTER}
						>
							<Button isLoading={isDeletePostLoading} onClick={deletePost}>
								Удалить
							</Button>
							{!isDeletePostLoading ? (
								<Button onClick={closeDeleteConfirmationModal}>Отмена</Button>
							) : null}
						</Row>
					</Column>
				</Modal.Body>
			</Modal>
		</>
	);
};

export { PostDropdown };
