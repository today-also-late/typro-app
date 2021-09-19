import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
// import Image from "next/image";
import { DropdownIcon, IconPrize } from "../components/atoms";
import { RankingDrawer } from "../components/molecules";
import { Menu, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getScore } from "../../redux/slices/scoreSlice";

// import First from "../../public/images/1.png";
// import Second from "../../public/images/2.png";
// import Third from "../../public/images/3.png";

export type rankingdata = {
  username: string;
  language: string;
  level: string;
  score: number | null;
  date: string;
  image: {
    id: string;
    path: string;
  };
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#424242",
      color: theme.palette.common.white,
      "&:hover": {
        color: "#bdbdbd",
      },
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Ranking = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const scores = useSelector(getScore).score;

  const [openLangDrawer, setOpenLangDrawer] = useState<null | HTMLElement>(
    null
  );
  const [openLevelDrawer, setOpenLevelDrawer] = useState<null | HTMLElement>(
    null
  );

  const langClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenLangDrawer(event.currentTarget);
  };
  const levelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenLevelDrawer(event.currentTarget);
  };

  const langDrawerClose = () => {
    setOpenLangDrawer(null);
  };
  const levelDrawerClose = () => {
    setOpenLevelDrawer(null);
  };

  const language: any = router.query["language"];

  const [rankingData, setRankingData] = useState<Array<rankingdata>>([
    {
      username: "",
      language: "",
      level: "",
      score: null,
      image: {
        id: "",
        path: "",
      },
      date: "",
    },
  ]);

  const [level, setLevel] = useState("easy");

  const changeLevel = (level: string) => {
    setLevel(level);
    levelDrawerClose();
  };

  const inputRankingData = (scoreList: Array<rankingdata>) => {
    setRankingData(scoreList);
  };

  useEffect(() => {
    const fetchRankingScores = async () => {
      await db
        .collection("ranking")
        .orderBy("score", "desc")
        .where("language", "==", language)
        .limit(30)
        .get()
        .then(async (snapshots) => {
          const scoreList: Array<rankingdata> = [];
          await snapshots.forEach(async (snapshot) => {
            let dateData = snapshot.data().created_at.toDate();
            dateData =
              dateData.getFullYear() +
              "/" +
              (Number(dateData.getMonth()) + 1).toString() +
              "/" +
              dateData.getDate();
            const scoreData = snapshot.data().score;
            const username = snapshot.data().username;
            const language = snapshot.data().language;
            const level = snapshot.data().level;
            const uid = snapshot.data().uid;
            const data: any = await (
              await db.collection("users").doc(uid).get()
            ).data();

            console.log(data);

            scoreList.push({
              date: dateData,
              language: language,
              level: level,
              score: scoreData,
              username: username,
              image: data.image,
            });
          });
          setTimeout(() => inputRankingData(scoreList), 500); // 非同期処理で先に実行されてしまうため,無理やり時間を作る
        })
        .catch((e: any) => {
          console.log(e);
        })
        .catch((e: any) => {
          console.log(e);
        });
    };
    fetchRankingScores();
  }, [language]);

  return (
    <div className="w-full h-full">
      <div className="">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Icon</StyledTableCell>
                <StyledTableCell align="right">Ranking</StyledTableCell>
                <StyledTableCell align="right">Score</StyledTableCell>
                <StyledTableCell align="right">
                  <button onClick={(e: any) => langClick(e)}>
                    Language
                    <DropdownIcon />
                  </button>
                  <RankingDrawer
                    anchorEl={openLangDrawer}
                    open={Boolean(openLangDrawer)}
                    onClose={langDrawerClose}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button onClick={(e: any) => levelClick(e)}>
                    Level
                    <DropdownIcon />
                  </button>
                  <Menu
                    anchorEl={openLevelDrawer}
                    keepMounted
                    open={Boolean(openLevelDrawer)}
                    onClose={levelDrawerClose}
                  >
                    <MenuItem button onClick={() => changeLevel("easy")}>
                      easy
                    </MenuItem>
                    <MenuItem button onClick={() => changeLevel("normal")}>
                      normal
                    </MenuItem>
                    <MenuItem button onClick={() => changeLevel("difficult")}>
                      difficult
                    </MenuItem>
                  </Menu>
                </StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankingData
                .filter((data) => data.level === level)
                .map((data: rankingdata, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {data.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {data.image !== null && (
                        <IconPrize index={index} image={data.image} />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">{index + 1}</StyledTableCell>
                    <StyledTableCell align="right">
                      {data.score}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {data.language}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {data.level}
                    </StyledTableCell>
                    <StyledTableCell align="right">{data.date}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default Ranking;
