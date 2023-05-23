import didPass from "@swiss-web2/utils/didpass";
import { VerificationStatus } from "didpass";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: VerificationStatus;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(404);
    return;
  }
  const { requestId } = req.query;

  if (requestId !== undefined) {
    const status = await checkStatus(requestId.toString());

    res.status(200).json({ status });
  }
}

async function checkStatus(requestId: string): Promise<VerificationStatus> {
  let status = (await didPass.checkStatus(requestId)).statusType;
  return status;
}