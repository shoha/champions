// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { exec } from "child_process";

export default function handler(req, res) {
  const date = exec("date", (error, stdout, stderr) => {
    res.status(200).json(stdout);
  });
}
