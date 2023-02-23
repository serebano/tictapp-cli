#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-net --allow-run --no-check
import { getJson, exists } from "./helpers.js";

export default async function status() {
    const FUNCTIONS_DOMAIN = Deno.env.get("FUNCTIONS_DOMAIN")

    if (!await exists('./tictapp.json')) {
        console.log(`No project found. run tictapp init`)
        Deno.exit()
    }


    const json = await getJson(`./tictapp.json`)

    const { profile, project } = json

    console.log(`
%c${profile.primary_email}

%c${project.name}  %c${project.status}%c

Api:        https://${project.endpoint}
Functions:  https://${project.ref}.${FUNCTIONS_DOMAIN}
`,
        "color: orange",
        "color: aquamarine;font-weight:bold",
        "background-color: grey",
        `color: blue`,
    );

}