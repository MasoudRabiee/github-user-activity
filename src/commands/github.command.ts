import { Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export class GithubCommand extends AbstractCommand {
	public async load(program: Command): Promise<void> {
		program
			.argument("<username>", "github user")
			.description("fetching recent user's github activity")
			.action(async (username: string) => {
				try {
					const url = `https://api.github.com/users/${username}/events`;
					const response = await axios.get(url, {
						headers: {
							Authorization: "Bearer " + process.env.GITHUB_TOKEN,
							Accept: "application/vnd.github+json",
							"X-GitHub-Api-Version": process.env.GITHUB_API_VERSION,
						},
					});
					console.log(response.data);
				} catch (err) {
					if (axios.isAxiosError(err)) {
						console.error("Axios error:", err.message);
					} else {
						console.error("An unexpected error occurred:", err);
					}
					throw err;
				}
			});
	}
}
