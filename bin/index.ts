#!/usr/bin/env node

import { Command } from "commander";
import { GithubCommand } from "../src/commands/github.command";

const bootstrap = async () => {
	const program = new Command();

	program
		.name("github-user-activity")
		.description(
			"A Cli program that fetches a user's recent GitHub activity and displays it in the terminal"
		)
		.version("1.0.0");

	await new GithubCommand().load(program);
	await program.parseAsync(process.argv);
};

bootstrap();
