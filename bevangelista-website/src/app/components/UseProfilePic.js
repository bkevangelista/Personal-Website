import { useEffect, useState } from "react";
import apiRoutes from "@/utils/apiRoutes";

export function useProfilePic(bucketName, fileName, prefix) {
	const [profilePicUrl, setProfilePicUrl] = useState("");

	useEffect(() => {
		async function fetchImage() {
			try {
				const response = await fetch(
					apiRoutes.getPresignedUrl(bucketName, fileName, prefix)
				);
				const url = await response.text();
				const cleanUrl = url.replace(/^"|"\$/g, "");
				setProfilePicUrl(cleanUrl);
			} catch (error) {
				console.error(`Error loading profile picture (${fileName}):`, error);
			}
		}

		fetchImage();
	}, [bucketName, fileName, prefix]);

	return { profilePicUrl };
}