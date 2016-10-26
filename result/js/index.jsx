
/* 渲染单个数据 */
const Group = React.createClass({
    // 处理a标签
    dela: str => str.replace(/<a.*>.*<\/a>/g, ""),
    // 处理多出来的标签
    delb: str => str.replace(/<\/?[^<>]>/g, ""),
    render: function(){
        return (<tr key={this.props.key}>
            <td><a href={this.props.obj.zpdz} target="_blank">{this.delb(this.props.obj.zwzp)}</a></td>
            <td>{this.props.obj.fklv}</td>
            <td>{this.dela(this.props.obj.gsmc)}</td>
            <td>{this.props.obj.gzdd}</td>
            <td><a href={this.props.obj.zldz} target="_blank">{decodeURI(this.props.obj.zldz)}</a></td>
            <td>{this.props.obj.gsxz}</td>
            <td>{this.props.obj.gsgm}</td>
        </tr>);
    }
});

/* 表格类 */
const Table = React.createClass({
    // 渲染组
    group: function(){
        return window._result.list.map((object, index)=>{
            return (<Group key={index} obj={object} />);
        });
    },
    render: function(){
        return (
            <table className="table table-bordered table-hover table-condensed table-striped">
                <thead>
                    <tr className="info">
                        <th className="td0">职位</th>
                        <th className="td1">反馈率</th>
                        <th className="td2">公司名称</th>
                        <th className="td3">工作地点</th>
                        <th className="td4">智联地址</th>
                        <th className="td5">公司性质</th>
                        <th className="td6">公司规模</th>
                    </tr>
                </thead>
                <tbody>{this.group()}</tbody>
            </table>
        );
    }
});

ReactDOM.render(
    <Table />,
    document.getElementById("result")
);


