import DocumentMeta from "react-document-meta";
import { useParams } from "react-router-dom";

export default function Article() {

	let { articleName } = useParams();

	const meta = {
		title: "Some Meta Title",
		description: "I am a description, and I can create multiple tags",
		canonical: "http://example.com/path/to/page",
		meta: {
			charset: "utf-8",
			name: {
				keywords: "react,meta,document,html,tags",
			},
		},
	};

	return (
		<DocumentMeta {...meta}>
			<h1>{articleName}</h1>
		</DocumentMeta>
	);
}
