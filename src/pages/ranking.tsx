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
import { DropdownIcon, IconPrize } from "../components/atoms";
import { RankingDrawer } from "../components/molecules";
import { Menu, MenuItem } from "@material-ui/core";

export type rankingdata = {
  uid: string;
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

type icondata = {
  image: {
    id: string;
    path: string;
  };
  username: string;
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

  const [rankingDataList, setRankingDataList] = useState<Array<rankingdata>>([
    {
      uid: "",
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

  const [iconDataList, setIconDataList] = useState<Array<icondata> | null>(
    null
  );

  const [level, setLevel] = useState("easy");

  const changeLevel = (level: string) => {
    setLevel(level);
    levelDrawerClose();
  };

  useEffect(() => {
    if (language) {
      const fetchRankingData = async () => {
        await db
          .collection("ranking")
          .orderBy("score", "desc")
          .where("language", "==", language)
          .limit(30)
          .get()
          .then(async (snapshots) => {
            const scoreList: Array<rankingdata> = [];
            snapshots.forEach(async (snapshot) => {
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
              // const response = await db.collection("users").doc(uid).get();
              // const data: any = response.data();

              scoreList.push({
                uid: uid,
                date: dateData,
                language: language,
                level: level,
                score: scoreData,
                username: username,
                image: {
                  id: "",
                  path: "",
                },
              });
            });
            setIconDataList(null); // 一度nullにしないとPython->Javascript->PythonのときにscoreListに値が反映される前に描画されるためエラーが出る
            setRankingDataList(scoreList);
          })
          .catch((e: any) => {
            console.log(e);
          })
          .catch((e: any) => {
            console.log(e);
          });
      };

      fetchRankingData();
    }
  }, [language]);

  useEffect(() => {
    const fetchIcon = async () => {
      const dataList: Array<icondata> = [];
      rankingDataList.map(async (rankingdata: rankingdata) => {
        if (rankingdata.uid) {
          const response = await db
            .collection("users")
            .doc(rankingdata.uid)
            .get();
          const data: any = response.data();
          dataList.push({
            image: data.image,
            username: rankingdata.username,
          });
          if (rankingDataList.length === dataList.length) {
            setIconDataList(dataList);
          }
        }
      });
    };
    fetchIcon();
  }, [rankingDataList]);

  useEffect(() => {
    if (iconDataList) {
      const scoreList: Array<rankingdata> = [];
      rankingDataList.map((rankingdata: rankingdata, index: number) => {
        console.log(index);
        if (iconDataList[index]) {
          scoreList.push({
            ...rankingdata,
            image: iconDataList[index].image,
          });
        }
      });
    }
  }, [iconDataList, rankingDataList]);

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
              {rankingDataList
                .filter((data) => data.level === level)
                .map((data: rankingdata, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      onClick={() => router.push("./" + data.uid)}
                    >
                      {data.username}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      onClick={() => router.push("./" + data.uid)}
                    >
                      {iconDataList ? (
                        <IconPrize
                          index={index}
                          image={
                            iconDataList.filter(
                              (icondata) => icondata.username === data.username
                            )[0].image
                          }
                        />
                      ) : (
                        <></>
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
